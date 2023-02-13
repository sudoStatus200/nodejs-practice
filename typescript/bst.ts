export class BinarySearchTree{
  left?:BinarySearchTree
  right?:BinarySearchTree

  constructor(public data:number){}

  private insertItem = (
    tree: BinarySearchTree | undefined,
    data: number,
  ): BinarySearchTree =>{
    if(tree ===  undefined ) return new BinarySearchTree(data)

    if(data <= tree.data) tree.left =  this.insertItem(tree.left, data)
    else tree.right = this.insertItem(tree.right, data)

    return tree
  }

  public insert = (data:number): BinarySearchTree => this.insertItem(this, data)

  public each = (callback:(data:number)=>void):void =>{
    this.left?.each(callback)
    callback(this.data)
    this.right?.each(callback)
  }

}