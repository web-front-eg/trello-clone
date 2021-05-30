import { autobind } from "../../decorator/autobind.js";

export class CardMover {
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

    console.log("Drag start!");

    if (!e.dataTransfer) {
      return;
    }

    const targetEvent = (e as Event).target;
    const { className } = targetEvent as HTMLElement;

    e.dataTransfer.setData("text/plain", className);
    e.dataTransfer.effectAllowed = "move";
  }

  @autobind
  public onDragEnd(e: DragEvent): void {
    // TODO: End dragging
    // -> turn off the move effect
    // -> on Fail to drag: restore the position and
    console.log("Drag end!");
  }

  @autobind
  public onDragOver(e: DragEvent): void {
    // TODO: push down except this card is the last card
    //       and attach a dummy from the starting position

    if (!e.dataTransfer || e.dataTransfer.types[0] !== "text/plain") {
      return;
    }

    e.preventDefault();
    // console.log(`drag over!!`);
    // TODO: change css to indicate card is being dragged and it's over the list
  }

  @autobind
  public onDrop(e: DragEvent): void {
    // TODO:
    // -> Success: move card into the new position
    // -> Fail: move back card to the starting position

    const card = e.dataTransfer!.getData("text/plain");
    if (!card) {
      return;
    }

    console.log("drop!", card);

    // move the card!
    // CardController.
  }

  @autobind
  public onDragLeave(e: DragEvent): void {
    //  if it's
    // console.log("drag leave!");
    // TODO: stop highlighting the list!
  }
}

// function allowDrop(ev) {
//   ev.preventDefault(); // default is not to allow drop
// }

// function dragStart(ev) {
//   ev.dataTransfer.setData("text/plain", ev.target.id);
// }

// function dropIt(ev) {
//   ev.preventDefault(); // default is not to allow drop

//   let sourceId = ev.dataTransfer.getData("text/plain");
//   let sourceIdEl = document.getElementById(sourceId);
//   let sourceIdParentEl = sourceIdEl.parentElement;
//   // ev.target.id here is the id of target Object of the drop
//   let targetEl = document.getElementById(ev.target.id);
//   let targetParentEl = targetEl.parentElement;

//   // Compare List names to see if we are going between lists
//   // or within the same list
//   if (targetParentEl.id !== sourceIdParentEl.id) {
//     // If the source and destination have the same
//     // className (card), then we risk dropping a Card in to a Card
//     // That may be a cool feature, but not for us!
//     if (targetEl.className === sourceIdEl.className) {
//       // Append to parent Object (list), not to a
//       // Card in the list
//       // This is in case you drag and drop a Card on top
//       // of a Card in a different list
//       targetParentEl.appendChild(sourceIdEl);
//     } else {
//       // Append to the list
//       targetEl.appendChild(sourceIdEl);
//     }
//   } else {
//     // Same list. Swap the text of the two cards
//     // Just like swapping the values in two variables

//     // Temporary holder of the destination Object
//     let holder = targetEl;
//     // The text of the destination Object.
//     // We are really just moving the text, not the Card
//     let holderText = holder.textContent;
//     // Replace the destination Objects text with the sources text
//     targetEl.textContent = sourceIdEl.textContent;
//     // Replace the sources text with the original destinations
//     sourceIdEl.textContent = holderText;
//     holderText = "";
//   }
// }
