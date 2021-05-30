import { Template } from "../../template/TemplateNames.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";

export namespace DragDrop {
  const movingCardIndicatorTemplateHelper = new TemplateHelper<HTMLDivElement>(
    "#moving-card-pos-indicator-disabled",
    Template.movingCardPosIndicator,
    "afterbegin"
  );

  const indicatorEl = movingCardIndicatorTemplateHelper.getCreatedEl;

  // static ctor 가 없어서 field 는 ctor 에서 초기화
  const originalPosEl: HTMLDivElement = document.getElementById(
    "moving-card-pos-indicator-disabled"
  )! as HTMLDivElement;

  export const onDragStart = (e: DragEvent): void => {
    // -> turn on the move effect
    //   1. rotate the target tiny bit
    //   2. replace the target with a dummy to indicate position of the target

    if (!e.dataTransfer) {
      return;
    }

    const targetEvent = (e as Event).target as HTMLElement;

    e.dataTransfer.setData("text/plain", targetEvent.id);
    e.dataTransfer.effectAllowed = "move";
  };

  export const onDragEnd = (e: DragEvent): void => {
    originalPosEl.insertAdjacentElement("afterend", indicatorEl);
    if (!indicatorEl.classList.contains("hidden")) {
      indicatorEl.classList.add("hidden");
    }
    // TODO: turn off the move effect
  };

  export const onDragOver = (e: DragEvent): void => {
    // prevent the default handling by both the dragEnter or dragOver since to allow a drop
    // dragEnter 와 dragOver 의 drop 허용을 위해 preventDefault() 호출
    e.preventDefault();

    // check data has been transferred at first
    // 먼저 data 전송 여부 체크
    if (!e.dataTransfer || e.dataTransfer.types[0] !== "text/plain") {
      return;
    }

    // check the moving card indicator which is containing .hidden and remove it to turn the indicator on
    // .hidden 포함 체크 후 moving card indicator 표시
    if (indicatorEl.classList.contains("hidden")) {
      indicatorEl.classList.remove("hidden");
    }

    // e.target -> the target on which being drag-over
    // e.target -> drag over 되는 타겟
    const targetEl = e.target as HTMLElement;

    // insert the indicator into in the afterEnd of the target
    // to attach right down to the target as always
    // 항상 target 의 아래에 위치시키기 위해서 indicator 를 target 의 afterEnd 위치로 삽입
    targetEl.insertAdjacentElement("afterend", indicatorEl);
  };

  export const onDrop = (e: DragEvent): void => {
    // e.preventDefault();

    originalPosEl.insertAdjacentElement("afterend", indicatorEl);
    if (!indicatorEl.classList.contains("hidden")) {
      indicatorEl.classList.add("hidden");
    }

    const draggableId = e.dataTransfer!.getData("text/plain");
    const draggableEl = document.getElementById(draggableId);

    const targetEl = e.target as HTMLElement;

    targetEl!.insertAdjacentElement("afterend", draggableEl!);

    // console.log("drop!", draggableId);

    // transfer the card data!
    // CardController.
  };

  export const onDragLeave = (e: DragEvent): void => {
    // TODO: stop highlighting the list!
  };
}
