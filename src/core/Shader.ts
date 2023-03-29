import { gl } from "./gl";

class UniformInfo {
    name: string;
    location: WebGLUniformLocation;
    type: number;
    size: number;
    isArray: boolean;
    constructor(name: string, location: WebGLUniformLocation, type: number, size: number, isArray: boolean) {
        this.name = name;
        this.location = location;
        this.type = type;
        this.size = size;
        this.isArray = isArray;
    }
}

class Shader {
    program: WebGLProgram;
    _semanticToAttribName: any;
    _attributes: any;
    _uniforms: any;
    constructor() {
        this.program = null;
        this._semanticToAttribName = {};
        this._attributes = {};
        this._uniforms = {};
    }
    create(vshader: string, fshader: string) {
        let vertexShader = this.loadShader(gl.VERTEX_SHADER, vshader);
        let fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, fshader);
        if (!vertexShader || !fragmentShader) {
            return false;
        }

        this.program = gl.createProgram();
        if (!this.program) {
            return false;
        }

        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);

        gl.linkProgram(this.program);

        let linked = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if (!linked) {
            let error = gl.getProgramInfoLog(this.program);
            console.log('Failed to link program: ' + error);
            gl.deleteProgram(this.program);
            gl.deleteShader(fragmentShader);
            gl.deleteShader(vertexShader);
            this.program = null;
            return false;
        }
        this.findoutAttributes();
        this.findoutUniforms();
    }
    loadShader(type: number, source: string) {
        let shader = gl.createShader(type);
        if (shader == null) {
            console.log('unable to create shader');
            return;
        }

        gl.shaderSource(shader, source);

        gl.compileShader(shader);

        let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            let error = gl.getShaderInfoLog(shader);
            console.log('Failed to compile shader: ' + error);
            gl.deleteShader(shader);
            return null;
        }

        return shader;

    }
    findoutAttributes() {
        let attributeCount = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < attributeCount; ++i) {
            let info = gl.getActiveAttrib(this.program, i);
            if (!info) {
                break;
            }

            this._attributes[info.name] = gl.getAttribLocation(this.program, info.name);
        }
        console.log('attributes', this._attributes);
    }
    findoutUniforms() {
        let uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; ++i) {
            let info: WebGLActiveInfo = gl.getActiveUniform(this.program, i);
            if (!info) {
                break;
            }

            let location = gl.getUniformLocation(this.program, info.name);
            let isArray = info.size > 1 && info.name.substr(-3) === '[0]';
            let uniformInfo = new UniformInfo(info.name, location, info.type, info.size, isArray);
            this._uniforms[info.name] = uniformInfo;
        }

        console.log('uniforms', this._uniforms);
    }
    mapAttributeSemantic(semantic: string, attribName: string) {
        this._semanticToAttribName[semantic] = attribName;
    }
    getAttributeLocation(semantic: string) {
        let name = this._semanticToAttribName[semantic];
        if (name) {
            let location = this._attributes[name];
            return location;
        } else {
            console.error('Shader: can not find attribute for semantic ' + semantic);
            return -1;
        }
    }
    use() {
        if (this.program) {
            gl.useProgram(this.program);
        }
    }
    setUniform(name: string, value: any) {
        let info = this._uniforms[name];
        if (!info) {
            console.error('can not find uniform named ' + name);
            return;
        }
        switch (info.type) {
            case gl.FLOAT: {
                if (info.isArray) {
                    gl.uniform1fv(info.location, value);
                } else {
                    gl.uniform1f(info.location, value);
                }
                break;
            }
            case gl.FLOAT_VEC2: {
                gl.uniform2fv(info.location, value);
                break;
            }
            case gl.FLOAT_VEC3: {
                gl.uniform3fv(info.location, value);
                break;
            }
            case gl.FLOAT_VEC4: {
                gl.uniform4fv(info.location, value);
                break;
            }
            case gl.FLOAT_MAT4: {
                gl.uniformMatrix4fv(info.location, false, value);
                break;
            }
            default: {
                console.error('uniform type not support', info.type)
                break;
            }
        }
    }
}
export { Shader }