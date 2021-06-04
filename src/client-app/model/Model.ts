import { rebuildLists } from "../view/RebuildLists.js";
import { Service } from "../service/Service.js";
import { delay } from "../util/timer.js";
import { ICard, IList, IState } from "./ModelInterface.js";

class Model {
  private state: IState;
  private rootEl: HTMLElement;

  constructor(detectInterval: number = 10) {
    this.state = {
      lists: [],
    };

    this.rootEl = document.querySelector("#root")! as HTMLElement;

    this.detectAnyChangeAndLoad(detectInterval);

    // document
    //   .querySelector(".save")!
    //   .addEventListener("click", this.save.bind(this, true));

    // document
    //   .querySelector(".load")!
    //   .addEventListener("click", this.load.bind(this));
  }

  public addNewList(title: string): void {
    this.state.lists.push(<IList>{ title, cards: [] });
    this.save(false);
  }

  public addNewCard(listPos: number, content: string): number {
    const cardsArr = this.state.lists[listPos].cards;
    const order = cardsArr.length;
    cardsArr.push({ content });
    this.save(false);
    return order;
  }

  private async detectAnyChange(): Promise<boolean> {
    return await Service.POST_DetectAnyChanges(this.state);
  }

  private async load(): Promise<void> {
    const loadedState: IState = await Service.GET_LoadLists();
    console.log(loadedState);

    // this.state = loadedState;
    // this.renderFromState();
  }

  private async save(fromHTML: boolean = true): Promise<void> {
    if (fromHTML) {
      this.updateState();
    }
    await Service.POST_SaveLists(this.state);
  }

  private async detectAnyChangeAndLoad(detectInterval: number): Promise<void> {
    while (true) {
      try {
        await delay(async () => {
          const hasChanged: boolean = await this.detectAnyChange();
          console.log(`hasChanged: ${hasChanged}`);

          if (hasChanged) {
            await this.load();
          }
        }, detectInterval);
      } catch (e: unknown) {
        console.error(`detect automatically failed! error status code: ${e}`);
      }
    }
  }

  public updateState(): void {
    this.state = this.makeNewStateFromHTML();
    // console.log(this.state);
  }

  public makeNewStateFromHTML(): IState {
    const newState = <IState>{
      lists: [],
    };

    // 1. lists 추가
    // lists 가져오기
    const allLists = Array.from(this.rootEl.querySelectorAll(".lists")!);
    if (!allLists) {
      return newState;
    }
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

  public renderFromState(): void {
    const { lists } = this.state;
    if (!Array.isArray(lists)) {
      return;
    }

    const listsLength = lists.length;
    const listsTitles = lists.map(list => list.title);
    const cardsLength = lists.map(list => list.cards.length);
    const cardsContents = lists.map(list =>
      list.cards.map(card => card.content)
    );

    rebuildLists(listsLength, listsTitles, cardsLength, cardsContents);
  }
}

export default new Model(5);
