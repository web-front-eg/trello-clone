export type TyHTMLCode = string;
export type TyEventListnerType = "click";
export type TyEventListner = (this: Document, e: Event) => any;

export type TyUUID = string;
export type TyIsUUIDUsed = boolean;

export type TyListener<Ty> = (cardOrList: Array<Ty>) => void;

export class Stack<Ty> {
  private curIdx: number = -1;
  private elements: Array<Ty> = [];

  constructor(...el: Array<Ty>) {
    if (el) {
      this.elements.push(...el);
    }
  }

  public push(newEl: Ty): void {
    this.elements.push(newEl);
    ++this.curIdx;
  }

  public pop(): Ty | undefined {
    if (this.curIdx <= -1) {
      return undefined;
    }

    --this.curIdx;
    return this.elements.pop();
  }

  public peek(): Ty | undefined {
    return this.elements[this.curIdx];
  }

  public deepCopy(): Stack<Ty> {
    return new Stack(...this.elements);
  }

  public deepCopyAsArr(): Array<Ty> {
    return this.elements.slice();
  }
}
