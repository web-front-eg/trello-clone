// import { autobind } from "../../decorator/autobind.js";
import { DragDrop } from "./DragDrop.js";

export class CardDragDrop {
  // private isFirstMove: boolean = true;

  constructor(
    private readonly cardEl: HTMLDivElement,
    private readonly parentPos: number,
    private readonly cardPos: number
  ) {
    this.cardEl.draggable = true;
    this.bind();
  }

  private bind(): void {
    // this.cardEl.addEventListener("dragstart", e =>
    //   DragDrop.onDragStart(e, this.parentPos, this.cardPos)
    // );
    this.cardEl.addEventListener("dragstart", DragDrop.onDragStart);
    this.cardEl.addEventListener("dragend", DragDrop.onDragEnd);
    this.cardEl.addEventListener("dragover", DragDrop.onDragOver);
    this.cardEl.addEventListener("drop", DragDrop.onDrop);
  }

  // @autobind
  // private onDrop(e: DragEvent): void {
  //   DragDrop.onDrop(e, this.isFirstMove);
  //   this.isFirstMove = false;
  // }
}
