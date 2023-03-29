// 顶点数据类型
let VertexSemantic = {
    POSITION: 'position', // 位置
    NORMAL: 'normal', // 法线
    TANGENT: 'tangent', // 切线
    COLOR: 'color', // 颜色
    UV0: 'uv0',
    UV1: 'uv1',
    UV2: 'uv2',
    UV3: 'uv3'
}
// 顶点数据格式
class VertexFormat {
    // 顶点数据类型 数组
    attribs: Array<string>;
    // 顶点数据类型映射表：类型 + 长度
    attribSizeMap: any;
    _vertexSize: number;
    constructor() {
        this.attribs = [];
        this.attribSizeMap = {};
        this._vertexSize = 0;
    }
    /**
     * 为一个顶点数据 增加对应类型
     * @param attribSemantic 顶点数据类型 
     * @param size 该顶点数据类型 包含数据长度
     */
    addAttrib(attribSemantic: string, size: number) {
        this.attribs.push(attribSemantic);
        this.attribSizeMap[attribSemantic] = size;
    }
    /**
     * 
     * @returns 该顶点数据的长度（包含所有类型的数据）
     */
    getVertexSize() {
        if (this._vertexSize === 0) {
            for (let i = 0; i < this.attribs.length; ++i) {
                let semantic = this.attribs[i];
                this._vertexSize += this.attribSizeMap[semantic];
            }
        }
        return this._vertexSize;
    }

}

export { VertexFormat, VertexSemantic }