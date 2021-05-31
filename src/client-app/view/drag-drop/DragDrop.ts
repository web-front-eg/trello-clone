import { Template } from "../../template/TemplateNames.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import Model, { ICard, IList, IState } from "../../model/Model.js";

export namespace DragDrop {
  type TyTransferredDataOnDrag = {
    draggableId: string;
  };

  const movingCardIndicatorTemplateHelper = new TemplateHelper<HTMLDivElement>(
    "#moving-card-pos-indicator-disabled",
    Template.movingCardPosIndicator,
    "afterbegin"
  );

  const indicatorEl = movingCardIndicatorTemplateHelper.getCreatedEl;

  // static ctor 가 없어서 field 는 ctor 에서 초기화
  const temporaryIndicatorPosEl: HTMLDivElement = document.getElementById(
    "moving-card-pos-indicator-disabled"
  )! as HTMLDivElement;

  export const onDragStart = (e: DragEvent): void => {
    // -> turn on the move effect
    //   1. rotate the target tiny bit
    //   2. replace the target with a dummy to indicate position of the target

    // e.dataTransfer & e.target never be invalid
    // e.dataTransfer & e.target 은 무조건 유효
    const targetEvent = e.target! as HTMLElement;

    const transferred = <TyTransferredDataOnDrag>{
      draggableId: targetEvent.id,
    };
    e.dataTransfer!.setData("text/plain", JSON.stringify(transferred));
    e.dataTransfer!.effectAllowed = "move";
  };

  export function onDragEnd(_: DragEvent): void {
    temporaryIndicatorPosEl.insertAdjacentElement("afterend", indicatorEl);
    if (!indicatorEl.classList.contains("hidden")) {
      indicatorEl.classList.add("hidden");
    }
  }

  export function onDragOver(e: DragEvent): void {
    // prevent the default handling by both the dragEnter or dragOver since to allow a drop
    // dragEnter 와 dragOver 의 drop 허용을 위해 preventDefault() 호출
    e.preventDefault();

    // check data has been transferred at first
    // 먼저 data 전송 여부 체크
    if (!e.dataTransfer || e.dataTransfer.types[0] !== "text/plain") {
      throw new Error("draggable data hasn't been transferred!");
    }

    // check the moving card indicator which is containing .hidden and remove it to turn the indicator on
    // .hidden 포함 체크 후 moving card indicator 표시
    if (indicatorEl.classList.contains("hidden")) {
      indicatorEl.classList.remove("hidden");
    }

    // e.target -> the target on which being drag-over
    // e.target -> drag over 되는 타겟
    const targetEl = e.target! as HTMLElement;

    // insert the indicator into in the afterEnd of the target
    // to attach right down to the target as always
    // 항상 target 의 아래에 위치시키기 위해서 indicator 를 target 의 afterEnd 위치로 삽입
    targetEl.insertAdjacentElement("afterend", indicatorEl);
  }

  export function onDrop(e: DragEvent): void {
    // hide indicator and attach to temporary position element transiently
    // indicator 를 숨기고 잠시 position element 에 붙혀둠
    temporaryIndicatorPosEl.insertAdjacentElement("afterend", indicatorEl);

    if (!indicatorEl.classList.contains("hidden")) {
      indicatorEl.classList.add("hidden");
    }

    // check data has been transferred at first
    // 먼저 data 전송 여부 체크
    if (!e.dataTransfer || e.dataTransfer.types[0] !== "text/plain") {
      throw new Error("draggable data hasn't been transferred!");
    }

    const transferred = e.dataTransfer!.getData("text/plain");
    const { draggableId } = JSON.parse(transferred) as TyTransferredDataOnDrag;

    const draggableEl = document.getElementById(draggableId);

    const targetEl = e.target! as HTMLElement;

    const currentListEl = targetEl.parentElement;
    if (!currentListEl) {
      return;
    }

    const rootEl = currentListEl.parentElement!;

    targetEl!.insertAdjacentElement("afterend", draggableEl!);

    Model.updateCards(makeNewState(rootEl));
  }

  function makeNewState(rootEl: HTMLElement): IState {
    const newState = <IState>{
      lists: [],
    };

    // 1. lists 추가
    // lists 가져오기
    const allLists = Array.from(rootEl?.querySelectorAll(".lists")!);
    newState.lists = new Array<IList>(allLists.length - 1);
    // 각 lists 의 타이틀 가져오기
    const allListsTitles = allLists.map(
      lists => lists.firstElementChild?.firstElementChild?.innerHTML
    );

    // 2. list 추가
    // 각 lists 에 title 를 추가한 새로운 list 를 추가
    allListsTitles.forEach((title: string | undefined, i: number) => {
      if (title) {
        const newList = <IList>{ title, cards: [] };
        newState.lists[i] = newList;
      }
    });

    // 3. card 추가
    // added-card 가져오기
    const allAddedCards = allLists.map(
      lists => lists.querySelectorAll(".list__added-card")!
    );
    // 필요 없는 부분 pop
    allAddedCards.pop();

    // 첫 번째 루프 - i 번째 lists 이용
    allAddedCards.forEach((cards: NodeListOf<Element>, i: number) => {
      // 두 번째 루프 - j 번째 cards 이용
      cards.forEach((card: Element, j: number) => {
        const content = card.firstElementChild?.firstElementChild?.innerHTML;
        if (content) {
          const newCard = <ICard>{ content };
          newState.lists[i].cards[j] = newCard;
        }
      });
    });
    return newState;
  }
}
