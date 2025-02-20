export type equationElement = {
    isVar : boolean; //put it as undefined if neither?
    degree : number | null;
    coeficient: number | null;
    constants:number | null;
}