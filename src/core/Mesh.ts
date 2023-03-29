import { VertexBuffer } from "./VertexBuffer";
import { VertexFormat } from "./VertexFormat";

class Mesh {
    _vertexBuffer: VertexBuffer;
    _indexBuffer: any;
    constructor(vertexFormat: VertexFormat) {
        this._vertexBuffer = new VertexBuffer(vertexFormat);
        this._indexBuffer = null;
    }
    setVertexData(semantic: string, data: any) {
        this._vertexBuffer.setData(semantic, data);
    }
    setTriangles(data: any) {
        if (this._indexBuffer == null) {
            // this._indexBuffer = new IndexBuffer();            
        }
        this._indexBuffer.setData(data);
    }
    render(shader: any) {

    }
    destroy() {
        this._vertexBuffer.destroy();
    }
    upload() {
        this._vertexBuffer.upload();
        if (this._indexBuffer) {
            this._indexBuffer.upload();
        }
    }
}
export { Mesh };