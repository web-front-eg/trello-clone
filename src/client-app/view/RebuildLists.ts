// import { AddListView } from "./list/AddListView.js";
// import { AddingListView } from "./list/AddingListView.js";
// import { AddCardView } from "./card/AddCardView.js";
// import { AddingCardView } from "./card/AddingCardView.js";
import { ViewCache } from "../controller/ViewCache.js";
// import { ListsView } from "./index.js";
import {
  AddListView,
  AddingListView,
  AddCardView,
  AddingCardView,
  ListsView,
} from "./index.js";
import { IList } from "../model/ModelInterface.js";

export function rebuildLists(loadedLists: IList[]): void {
  const listsLen = loadedLists.length;
  const listsTitles: string[] = loadedLists.map(list => list.title);

  const cardsLen = loadedLists.map(list => list.cards.length);
  const cardsContents: string[][] = loadedLists.map(list =>
    list.cards.map(card => card.content)
  );

  // no need to advance without any lists
  if (listsLen == 0) {
    return;
  }

  // remove the existing all states in HTML
  Array.from(document.getElementById("root")?.children!).forEach(child =>
    child.remove()
  );

  ViewCache.reinit();

  // create a new lists
  ViewCache.listsView = new ListsView();

  // reinitialize current list position
  ViewCache.listsView.reinitCurrentListPosition();

  const addList = ViewCache.listsView.nextView as AddListView;

  for (let i = 0; i < listsLen; ++i) {
    // click add list -> open adding list
    addList.click();

    const addingList = addList.nextView as AddingListView;
    // set up the title into adding list
    addingList.loadTitle(listsTitles[i]);
    // click save -> create added list
    addingList.click();

    // no need to advance without any cards
    if (!cardsLen[i]) {
      continue;
    }

    const addCard = addingList.nextView.nextView as AddCardView;
    addCard.click();

    const addingCard = ViewCache.addingCardView as AddingCardView;

    for (let j = 0; j < cardsLen[i]; ++j) {
      addingCard.loadContent(cardsContents[i][j]);
      addingCard.click();
    }
  }
}
