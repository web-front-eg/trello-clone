import { ViewCache } from "./ViewCache.js";
import Model from "../model/Model.js";

export namespace CardController {
  export function onClickAddCardAgain(keepClosing: number): void {
    // open adding card first
    ViewCache.addingCardView.reopen();

    // reopen other add cards except current add card
    ViewCache.getAddCardViewAll()
      .filter((_, i: number) => i !== keepClosing)
      .forEach(addCard => addCard.reopen());
  }

  export function onCloseAddingCard(idx: number): void {
    ViewCache.getAddCardView(idx).reopen();
  }

  export function onNewAddedCardAdded(idx: number): void {
    ViewCache.getAddCardView(idx).moveAddCardUnder(ViewCache.addingCardView);
  }

  export function onSetContentInAddedCard(
    listPos: number,
    content: string,
    isAutoUpdate: boolean
  ): number {
    const currentCardPos = Model.addNewCard(listPos, content, isAutoUpdate);
    return currentCardPos;
  }
}
