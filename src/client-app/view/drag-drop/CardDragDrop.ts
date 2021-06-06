import { DragDrop } from "./DragDrop.js";

export class CardDragDrop {
  constructor(private readonly cardEl: HTMLDivElement) {
    this.cardEl.draggable = true;
    this.bind();
  }

  private bind() {
    this.cardEl.addEventListener("dragstart", DragDrop.onDragStart);
    this.cardEl.addEventListener("dragend", DragDrop.onDragEnd);
    this.cardEl.addEventListener("dragover", DragDrop.onDragOver);
    this.cardEl.addEventListener("drop", DragDrop.onDrop);
  }
}
