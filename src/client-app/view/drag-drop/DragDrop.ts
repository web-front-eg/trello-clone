import { TemplateNames } from "../../template/TemplateNames.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import Model from "../../model/Model.js";

export namespace DragDrop {
  type TyTransferredDataOnDrag = {
    draggableId: string;
  };

  const movingCardIndicatorTemplateHelper = new TemplateHelper<HTMLDivElement>(
    "#moving-card-pos-indicator-disabled",
    TemplateNames.movingCardPosIndicator,
    "afterbegin"
  );

  const indicatorEl = movingCardIndicatorTemplateHelper.createdEl;

  const temporaryIndicatorPosEl: HTMLDivElement = document.getElementById(
    "moving-card-pos-indicator-disabled"
  )! as HTMLDivElement;

  export function onDragStart(e: DragEvent) {
    // e.dataTransfer & e.target never be invalid
    const targetEl = e.target! as HTMLElement;
    targetEl.classList.toggle("dragged");

    const transferred = <TyTransferredDataOnDrag>{
      draggableId: targetEl.id,
    };

    // TODO: ERROR! same data isn't transferred.

    e.dataTransfer!.setData("text/plain", JSON.stringify(transferred));
    e.dataTransfer!.effectAllowed = "move";
  }

  export function onDragEnd(e: DragEvent) {
    // attach indicator to the temporary pos
    temporaryIndicatorPosEl.insertAdjacentElement("afterend", indicatorEl);

    // hide indicator element
    if (!indicatorEl.classList.contains("hidden")) {
      indicatorEl.classList.add("hidden");
    }

    // enable drag effect
    (e.target as HTMLElement).classList.toggle("dragged");
  }

  export function onDragOver(e: DragEvent) {
    // prevent the default handling by both the dragEnter or dragOver since it's to allow a drop
    e.preventDefault();

    // check data has been transferred at first
    if (!e.dataTransfer || e.dataTransfer.types[0] !== "text/plain") {
      throw new Error("draggable data hasn't been transferred!");
    }

    // check the moving card indicator which is containing .hidden and remove it to turn the indicator on
    if (indicatorEl.classList.contains("hidden")) {
      indicatorEl.classList.remove("hidden");
    }

    // e.target -> the target on which being drag-over
    const targetEl = e.target! as HTMLElement;

    // insert the indicator into in the afterEnd of the target
    // to attach right down to the target as always
    targetEl.insertAdjacentElement("afterend", indicatorEl);
  }

  export function onDrop(e: DragEvent) {
    // hide indicator and attach to temporary position element transiently
    temporaryIndicatorPosEl.insertAdjacentElement("afterend", indicatorEl);

    if (!indicatorEl.classList.contains("hidden")) {
      indicatorEl.classList.add("hidden");
    }

    // check data has been transferred at first
    if (!e.dataTransfer || e.dataTransfer.types[0] !== "text/plain") {
      throw new Error("draggable data hasn't been transferred!");
    }

    // get data
    const transferred = e.dataTransfer!.getData("text/plain");
    const { draggableId } = <TyTransferredDataOnDrag>JSON.parse(transferred);

    // get draggable element
    const draggableEl = document.getElementById(draggableId);

    const dropTargetEl = <HTMLElement>e.target!;

    if (!dropTargetEl) {
      return;
    }

    dropTargetEl!.insertAdjacentElement("afterend", draggableEl!);

    Model.updateStateFromHTML();
  }
}
