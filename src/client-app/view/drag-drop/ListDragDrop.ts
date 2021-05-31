// import { autobind } from "../../decorator/autobind.js";
import { DragDrop } from "./DragDrop.js";

export class ListDragDrop {
  // private isFirstMove: boolean = true;
  constructor(private readonly addedListEl: HTMLDivElement) {
    this.bind();
  }

  private bind(): void {
    this.addedListEl.addEventListener("dragover", DragDrop.onDragOver);
    this.addedListEl.addEventListener("drop", DragDrop.onDrop);
  }

  // @autobind
  // private onDrop(e: DragEvent): void {
  //   (e, this.isFirstMove);
  //   this.isFirstMove = false;
  // }
}
