import { delay } from "../util/timer.js";

interface ICard {
  content: string;
}

interface IList {
  title: string;
  cards: Array<ICard>;
}

// interface IColumns {
//   columns: Array<IList>;
// }

interface IState {
  columns: Array<IList>;
}

export class Model {
  private readonly state: IState;
  public get getState(): IState {
    return this.state;
  }

  private readonly syncInterval: number;
  private get getSyncIntervalAsMS(): number {
    return this.syncInterval * 1000;
  }

  constructor(syncInterval: number = 5) {
    this.syncInterval = syncInterval;
    this.syncAutomatically();
  }

  public save(): boolean {
    try {
      // TOOD: POST data to server

      this.sync();
      return true;
    } catch (e: unknown) {
      return false;
    }
  }

  public sync(): boolean {
    try {
      // TODO: GET data from server and apply into state

      return true;
    } catch (e: unknown) {
      return false;
    }
  }

  public async syncAutomatically(): Promise<void> {
    while (true) {
      try {
        await delay(this.sync, this.getSyncIntervalAsMS);
      } catch (e: unknown) {
        console.error(`sync automatically failed! error status code: ${e}`);
      }
    }
  }

  public addList(currentListPos: number, title: string): void {
    this.state.columns[currentListPos].title = title;
  }

  public addCard(currentListPos: number, content: string): void {
    this.state.columns[currentListPos].cards.push({ content });
  }

  public moveCard(
    fromListPos: number,
    fromCardPos: number,
    toListPos: number,
    toCardPos: number
  ): void {
    const target: ICard = this.state.columns[fromListPos].cards[fromCardPos];

    if (!target) {
      throw new Error(`No Card exists at ${fromListPos}:${fromCardPos}`);
    }
    
    this.state.columns[toListPos].cards[toCardPos] = target;
  }
}
