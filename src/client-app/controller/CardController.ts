import { ViewCache } from "./ViewCache.js";
import Model from "../model/Model.js";

export namespace CardController {
  export function onClickAddCardAgain(keepClosing: number) {
    // open adding card first
    ViewCache.addingCardView.reopen();

    // reopen other add cards except current add card
    ViewCache.getAddCardViewAll()
      .filter((_, i: number) => i !== keepClosing)
      .forEach(addCard => addCard.reopen());
  }

  export function onCloseAddingCard(idx: number) {
    ViewCache.getAddCardView(idx).reopen();
  }

  export function onNewAddedCardAdded(idx: number) {
    ViewCache.getAddCardView(idx).moveAddCardUnder(ViewCache.addingCardView);
  }

  export function onSetContentInAddedCard(
    listPos: number,
    content: string,
    isAutoUpdate: boolean
  ) {
    Model.addNewCard(listPos, content, isAutoUpdate);
  }
}
