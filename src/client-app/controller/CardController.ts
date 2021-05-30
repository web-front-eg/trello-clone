import { ViewCache } from "./ViewCache.js";
import Model from "../model/Model.js";

export namespace CardController {
  export const onClickAddCardAgain = (idx: number): void => {
    ViewCache.getAddingCardView(idx).onClickAddCardAgain();
  };

  export const onCloseAddingCard = (idx: number): void => {
    ViewCache.getAddCardView(idx).onCloseAddingCard();
  };

  export const onAddingCardAdded = (idx: number): void => {
    ViewCache.getAddCardView(idx).onAddingCardAdded(
      ViewCache.getAddingCardView(idx)
    );
  };

  export const onSetContentInAddedCard = (
    listPos: number,
    content: string
  ): number => {
    return Model.addCard(listPos, content);
  };
}
