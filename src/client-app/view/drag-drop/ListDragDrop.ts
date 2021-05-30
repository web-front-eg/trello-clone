import { DragDrop } from "./DragDrop.js";

export class ListDragDrop {
  constructor(private readonly addedListEl: HTMLDivElement) {
    this.bind();
  }

  private bind(): void {
    this.addedListEl.addEventListener("dragover", DragDrop.onDragOver);
    this.addedListEl.addEventListener("drop", DragDrop.onDrop);
  }
}
