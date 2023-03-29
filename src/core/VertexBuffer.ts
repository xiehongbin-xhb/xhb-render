// 顶点数据buffer
import { gl } from "./gl";
import { VertexFormat, VertexSemantic } from "./VertexFormat";

/**
 * 顶点数据 具体类型类，包含这个类型的所有数据
 */
class VertexAttribInfo {
    // 顶点数据 具体类型名
    semantic: string;
    // 顶点数据 具体类型的长度
    size: number;
    // 顶点数据 具体类型 的偏移 
    offset: number;
    // 顶点数据 具体类型 的具体数据
    data: any;
    constructor(attribSementic: string, attribSize: number) {
        this.semantic = attribSementic;
        this.size = attribSize;
        this.offset = 0;
        this.data = null;
    }
}
class VertexBuffer {
    _vertexCount: number;
    _vertexStride: number;
    _vertexFormat: VertexFormat;
    _attribsInfo: any;
    _bufferData: any;
    _vbo: WebGLBuffer;
    BYTES_PER_ELEMENT: number;
    constructor(vertexFormat: VertexFormat) {
        this._vertexCount = 0;
        this._vertexStride = 0; // / vertex data size in byte
        this._vertexFormat = vertexFormat;
        // 顶点数据类型 => 具体的实例
        this._attribsInfo = {};
        this._bufferData = null;

        this.BYTES_PER_ELEMENT = 4; // for Float32Array
        // this._vertexFormat.attribs 代表的是 这份顶点数据中  有多少种类型 
        let attribNum = this._vertexFormat.attribs.length;
        // 
        for (let i = 0; i < attribNum; ++i) {
            // 类型名
            let semantic = this._vertexFormat.attribs[i];
            // 每种类型的size
            let size = this._vertexFormat.attribSizeMap[semantic];
            if (size == null) {
                console.error('VertexBuffer: bad semantic');
            } else {
                // 实例化每个类型
                let info = new VertexAttribInfo(semantic, size);
                // 把每个类型的实例存储在 this._attribsInfo
                this._attribsInfo[semantic] = info;
            }
        }
        this._vbo = gl.createBuffer();
    }
    get vbo() {
        return this._vbo;
    }

    get vertexCount() {
        return this._vertexCount;
    }

    get vertexStride() {
        return this._vertexStride;
    }
    /**
     * 设置不同类型的顶点数据
     * @param semantic 顶点数据类型
     * @param data 顶点数据类型 对应的数据
     */
    setData(semantic: string, data: Array<any>) {
        this._attribsInfo[semantic].data = data;
    }

    destroy() {
        gl.deleteBuffer(this._vbo);
        this._vbo = 0;
    }

    _compile() {
        // 位置类型的 实例
        let positionInfo = this._attribsInfo[VertexSemantic.POSITION];
        if (positionInfo == null) {
            console.error('VertexBuffer: no attrib position');
            return;
        }
        if (positionInfo.data == null || positionInfo.data.length === 0) {
            console.error('VertexBuffer: position data is empty');
            return;
        }
        // 顶点数量
        // data.length 表示数据的个数，比如所有的数据 有15个
        // data.size 表示这种类型的长度， size长度是3，算出来也就是5个顶点的数据
        // 也就可以得到这个类型的个数
        this._vertexCount = positionInfo.data.length / positionInfo.size;
        // 算出每个顶点之间的偏移
        this._vertexStride = this._vertexFormat.getVertexSize() * this.BYTES_PER_ELEMENT;

        this._bufferData = [];
        for (let i = 0; i < this._vertexCount; ++i) {
            for (let semantic of this._vertexFormat.attribs) {
                // semantic每种类型
                let info = this._attribsInfo[semantic];
                // info是每种类型的实例
                if (info == null || info.data == null) {
                    console.error('VertexBuffer: bad semantic ' + semantic);
                    continue;
                }
                // 将所有类型拼接起来，统一放到bufferData里面
                for (let k = 0; k < info.size; ++k) {
                    let value = info.data[i * info.size + k];
                    if (value === undefined) {
                        console.error('VertexBuffer: missing value for ' + semantic);
                    }
                    this._bufferData.push(value);
                }
            }
        }
        // offset 表示取每一个顶点数据中的某个类型时，需要偏移多少
        let offset = 0;
        for (let semantic of this._vertexFormat.attribs) {
            let info = this._attribsInfo[semantic];
            // 修改每个类型实例的offset
            info.offset = offset;
            // 这里为什么要清空数据？
            info.data = null;
            offset += info.size * this.BYTES_PER_ELEMENT;
        }
    }

    //upload data to webGL, add free buffer data
    upload() {
        this._compile();

        let buffer = new Float32Array(this._bufferData);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
        gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        this._bufferData = null;
    }
    bindAttrib(shader: any) {
        for (let semantic of this._vertexFormat.attribs) {
            let info = this._attribsInfo[semantic];

            let location = shader.getAttributeLocation(semantic);
            if (location >= 0) {
                gl.vertexAttribPointer(location,
                    info.size,
                    gl.FLOAT, //type 
                    false, //normalized, 
                    this._vertexStride,
                    info.offset);
                gl.enableVertexAttribArray(location);
            }
        }
    }

    unbindAttrib(shader: any) {
        for (let semantic of this._vertexFormat.attribs) {
            let location = shader.getAttributeLocation(semantic);
            if (location >= 0) {
                gl.disableVertexAttribArray(location);
            }
        }
    }
}

export { VertexBuffer }