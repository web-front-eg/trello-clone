import { ViewCache } from "./ViewCache.js";
import Model from "../model/Model.js";

export namespace CardController {
  export function onClickAddCardAgain(): void {
    ViewCache.addingCardView.reopen();
  }

  export function onCloseAddingCard(idx: number): void {
    ViewCache.getAddCardView(idx).reopen();
  }

  export function onNewAddedCardAdded(idx: number): void {
    ViewCache.getAddCardView(idx).moveAddCardUnder(ViewCache.addingCardView);
  }

  export function onSetContentInAddedCard(
    listPos: number,
    content: string
  ): number {
    const currentCardPos = Model.addNewCard(listPos, content);
    return currentCardPos;
  }
}
