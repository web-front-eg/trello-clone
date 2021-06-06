import { ViewCache } from "./ViewCache.js";
import Model from "../model/Model.js";

/**
 * Singleton
 */
export namespace CardController {
  /**
   * @param keepClosingListPos the postion of list which to keep being closed
   */
  export function onClickAddCardAgain(keepClosingListPos: number) {
    // open adding-card first
    ViewCache.addingCardView.reopen();

    // reopen other add-cards except the add-card in current list
    const openedAddCards = ViewCache.getAddCardViewAll().filter(
      (_, i: number) => i !== keepClosingListPos
    );

    openedAddCards.forEach(addCard => addCard.reopen());
  }

  /**
   * @param listPos the current list pos at which the adding card is attached
   */
  export function onCloseAddingCard(listPos: number) {
    ViewCache.getAddCardView(listPos).reopen();
  }

  /**
   * @param listPos the current list pos at which the adding card is attached
   */
  export function onNewAddedCardAdded(listPos: number) {
    ViewCache.getAddCardView(listPos).moveAddCardUnderAddingCard();
  }

  /**
   * add new card
   * @param listPos the current list pos at which the adding card is
   * @param content card content
   * @param isAutoUpdate if true, adding new card doesn't occur saving operation to the server.
   */
  export function onSetContentInAddedCard(
    listPos: number,
    content: string,
    isAutoUpdate: boolean
  ) {
    Model.addNewCard(listPos, content, isAutoUpdate);
  }
}
