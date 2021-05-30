import { autobind } from "../../decorator/autobind.js";
import { Template } from "../../template/TemplateNames.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";

export class CardMover {
  public static readonly dummyCardEl = new TemplateHelper<HTMLDivElement>(
    "#dummy-hider",
    Template.dummyCard,
    "afterbegin"
  );

  // private readonly originalPosEl: HTMLElement;

  constructor(
    private readonly cardEl: HTMLDivElement,
    private readonly cardPos: number
  ) {
    this.cardEl.draggable = true;
    this.bind();
  }

  private bind(): void {
    this.cardEl.addEventListener("dragstart", this.onDragStart);
    this.cardEl.addEventListener("dragend", this.onDragEnd);
    this.cardEl.addEventListener("dragover", this.onDragOver);
    this.cardEl.addEventListener("drop", this.onDrop);
    this.cardEl.addEventListener("dragleave", this.onDragLeave);
  }

  @autobind
  public onDragStart(e: DragEvent): void {
    // TODO: Start dragging

    // -> turn on the move effect
    //   1. rotate the target tiny bit
    //   2. replace the target with a dummy to indicate position of the target

    if (!e.dataTransfer) {
      return;
    }

    const targetEvent = (e as Event).target as HTMLElement;

    e.dataTransfer.setData("text/plain", targetEvent.id);
    e.dataTransfer.effectAllowed = "move";
  }

  @autobind
  public onDragEnd(e: DragEvent): void {
    // TODO: End dragging
    // -> turn off the move effect
    console.log("Drag end!");
  }

  @autobind
  public onDragOver(e: DragEvent): void {
    // e -> dragged target's event

    // TODO: push down except this card is the last card
    //       and attach a dummy from the starting position

    if (!e.dataTransfer || e.dataTransfer.types[0] !== "text/plain") {
      return;
    }

    const targetEl = e.target as HTMLElement;
    targetEl.insertAdjacentElement(
      "afterend",
      CardMover.dummyCardEl.getCreatedEl
    );

    e.preventDefault();
    // TODO: change css to indicate card is being dragged and it's over the list
  }

  @autobind
  public onDrop(e: DragEvent): void {
    e.preventDefault();

    // TODO:
    // -> Success: move card into the new position
    // -> Fail: move back card to the starting position

    const draggableId = e.dataTransfer!.getData("text/plain");
    const draggableEl = document.getElementById(draggableId);

    const targetEl = e.target as HTMLElement;

    if (targetEl.className === draggableEl!.className) {
      targetEl!.insertAdjacentElement("afterend", draggableEl!);
      // console.log(targetEl, draggableEl);
    }

    // console.log("drop!", draggableId);

    // transfer the card data!
    // CardController.
  }

  @autobind
  public onDragLeave(e: DragEvent): void {
    //  if it's
    // console.log("drag leave!");
    // TODO: stop highlighting the list!
  }
}
