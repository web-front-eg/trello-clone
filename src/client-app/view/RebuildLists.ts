import { AddListView } from "./list/AddListView.js";
import { AddingListView } from "./list/AddingListView.js";
import { AddCardView } from "./card/AddCardView.js";
import { AddingCardView } from "./card/AddingCardView.js";
import { ViewCache } from "../controller/ViewCache.js";
import { ListsView } from "./index.js";
import { View } from "./View.js";

export const rebuildLists = (
  listsLen: number,
  listsTitles: string[],
  cardsLen: number[],
  cardsContents: string[][]
) => {
  console.log(`listsLen: ${listsLen}, cardsLen: ${cardsLen}`);
  console.log(`listsTitles: ${listsTitles}, cardsTitles: ${cardsContents}`);

  Array.from(document.getElementById("root")?.children!).forEach(child =>
    child.remove()
  );

  ViewCache.listsView = new ListsView();
  ViewCache.listsView.reinitCurrentListPosition();
  const addList = ViewCache.listsView.nextView as AddListView;

  for (let i = 0; i < listsLen; ++i) {
    // click add list -> open adding list
    addList.click();

    const addingList = addList.nextView as AddingListView;
    // set up the title into adding list
    addingList.load(listsTitles[i]);
    // click save -> create added list
    addingList.click();

    if (!cardsLen[i]) {
      continue;
    }

    const addCard = addingList.nextView.nextView as AddCardView;
    addCard.click();
    
    const addingCard = ViewCache.addingCardView as AddingCardView;

    for (let j = 0; j < cardsLen[i]; ++j) {
      addingCard.load(cardsContents[i][j]);
      addingCard.click();
    }
  }
};
