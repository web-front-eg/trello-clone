import { rebuildLists } from "../view/RebuildLists.js";
import { Service } from "../service/Service.js";
import { delay } from "../util/timer.js";
import { ICard, IList, IState } from "./ModelInterface.js";

class Model {
  public state: IState;
  private rootEl: HTMLElement;

  constructor(detectInterval: number = 10) {
    this.state = {
      lists: [],
    };

    this.rootEl = document.querySelector("#root")! as HTMLElement;

    this.detectAnyChangeAndLoad(detectInterval);
  }

  public addNewList(title: string, isAutoUpdate: boolean) {
    this.state.lists.push(<IList>{ title, cards: [] });
    if (!isAutoUpdate) {
      this.save();
    }
  }

  public addNewCard(listPos: number, content: string, isAutoUpdate: boolean) {
    const cardsArr = this.state.lists[listPos].cards;
    cardsArr.push({ content });
    if (!isAutoUpdate) {
      this.save();
    }
  }

  private async save() {
    await Service.POST_SaveLists(this.state);
  }

  private async load() {
    const loadedLists = await Service.GET_LoadLists();
    console.log("Incoming : ", loadedLists, " original : ", this.state.lists);

    this.state.lists = [];
    this.renderFromState(loadedLists);
  }

  private async detectAnyChangeAndLoad(detectInterval: number) {
    setInterval(async () => {
      try {
        const hasChanged: boolean = await Service.POST_DetectAnyChanges(
          this.state
        );
        // console.log(`hasChanged: ${hasChanged}`);

        if (hasChanged) {
          await this.load();
        }
      } catch (e: unknown) {
        console.error(
          `detect automatically failed! error status code: `,
          e as Error
        );
      }
    }, detectInterval * 1000);
  }

  public updateState() {
    this.state = this.makeNewStateFromHTML();
    this.save();
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
        const newList = <IList>{ pos: i, title, cards: [] };
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

  public renderFromState(loadedLists: IList[]) {
    const listsLength = loadedLists.length;
    const listsTitles = loadedLists.map(list => list.title);
    const cardsLength = loadedLists.map(list => list.cards.length);
    const cardsContents = loadedLists.map(list =>
      list.cards.map(card => card.content)
    );

    rebuildLists(listsLength, listsTitles, cardsLength, cardsContents);
  }
}

export default new Model(5);
