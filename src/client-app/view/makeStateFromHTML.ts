import { ICard, IList, IState } from "../model/ModelInterface.js";

export function makeNewStateFromHTML(): IState {
  const newState = <IState>{
    lists: [],
  };

  /**
   * for rebuild whole lists with the fetched data
   */
  const rootEl = <HTMLElement>document.querySelector("#root")!;

  // 1. add lists
  // query lists elements
  const allLists = Array.from(rootEl.querySelectorAll(".lists")!);
  if (!allLists) {
    throw new Error("No lists found!");
  }

  newState.lists = new Array<IList>(allLists.length - 1);

  // get the title of each lists
  const allListsTitles = allLists.map(
    lists => lists.firstElementChild?.firstElementChild?.innerHTML
  );

  // 2. add list into the lists
  allListsTitles.forEach((title: string | undefined, i: number) => {
    if (title) {
      const newList = <IList>{ pos: i, title, cards: [] };
      newState.lists[i] = newList;
    }
  });

  // 3. add card
  // query added-card elements
  const allAddedCards = allLists.map(
    lists => lists.querySelectorAll(".list__added-card")!
  );

  if (!allAddedCards) {
    throw new Error("No added cards found!");
  }

  // pop out an unnecessary.
  allAddedCards.pop();

  // first iteration - utilize the i-th lists
  allAddedCards.forEach((cards: NodeListOf<Element>, i: number) => {
    // second iteration - utilize the j-th card
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
