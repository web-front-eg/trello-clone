import { DragDrop } from "./DragDrop.js";

/**
 * bind helper of added-card to drag functionality
 */
export class CardDragDrop {
  constructor(private readonly draggableCardEl: HTMLDivElement) {
    this.draggableCardEl.draggable = true;
    this.bind();
  }

  private bind() {
    this.draggableCardEl.addEventListener("dragstart", DragDrop.onDragStart);
    this.draggableCardEl.addEventListener("dragend", DragDrop.onDragEnd);
    this.draggableCardEl.addEventListener("dragover", DragDrop.onDragOver);
    this.draggableCardEl.addEventListener("drop", DragDrop.onDrop);
  }
}
