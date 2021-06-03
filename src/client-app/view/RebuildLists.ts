import { AddListView } from "./list/AddListView.js";
import { AddingListView } from "./list/AddingListView.js";
import { ListsView } from "./ListsView.js";
import { AddedCardView } from "./card/AddedCardView.js";
import { AddedListView } from "./list/AddedListView.js";
import { AddCardView } from "./card/AddCardView.js";
import { AddingCardView } from "./card/AddingCardView.js";
import { ViewCache } from "../controller/ViewCache.js";

export const rebuildLists = (
  listsLen: number,
  listsTitles: string[],
  cardsLen: number[],
  cardsContents: string[][]
) => {
  const addList = ViewCache.listsView.nextView as AddListView;

  for (let i = 0; i < listsLen; ++i) {
    // click add list -> open adding list
    addList.click();

    const addingList = addList.nextView as AddingListView;
    // set up the title into adding list
    addingList.load(listsTitles[i]);
    // click save -> create added list
    addingList.click();

    const addCard = addingList.nextView.nextView as AddCardView;
    addCard.currentEl.click();
    const addingCard = ViewCache.addingCardView as AddingCardView;

    for (let j = 0; j < cardsLen[i]; ++j) {
      addingCard.load(cardsContents[i][j]);
      addingCard.click();
    }
  }
};
