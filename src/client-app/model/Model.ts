import { delay } from "../util/timer.js";
import { IList } from "./IList.js";

interface IState {
  columns: Array<IList>;
}

class Model {
  private readonly state: IState;
  public get getState(): IState {
    return this.state;
  }

  constructor(saveInterval: number = 5, syncInterval: number = 5) {
    this.state = {
      columns: [],
    };

    // this.saveAutomatically(saveInterval);
    // this.syncAutomatically(syncInterval);
  }

  public save(): boolean {
    try {
      // TOOD: POST data to server

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

  public async syncAutomatically(syncInterval: number): Promise<void> {
    while (true) {
      try {
        await delay(this.sync, syncInterval * 1000);
      } catch (e: unknown) {
        console.error(`sync automatically failed! error status code: ${e}`);
      }
    }
  }

  public async saveAutomatically(saveInterval: number): Promise<void> {
    while (true) {
      try {
        await delay(this.save, saveInterval * 1000);
      } catch (e: unknown) {
        console.error(`save automatically failed! error status code: ${e}`);
      }
    }
  }

  public addList(title: string): void {
    this.state.columns.push(<IList>{ title, cards: [] });
    // console.log(listPos, title);
    // console.log(this.state);
  }

  public addCard(listPos: number, content: string): void {
    this.state.columns[listPos].cards.push({ content });
    // console.log(listPos, content);
    // console.log(this.state);
  }

  public moveCard(
    fromListPos: number,
    fromCardPos: number,
    toListPos: number,
    toCardPos: number
  ): void {
    if (fromListPos < 0) {
      throw new Error("fromListPos can't be 0 below");
    }

    if (fromCardPos < 0) {
      throw new Error("fromCardPos can't be 0 below");
    }

    if (toListPos < 0) {
      throw new Error("toListPos can't be 0 below");
    }

    if (toCardPos < 0) {
      throw new Error("toCardPos can't be 0 below");
    }

    const targetCard = this.state.columns[fromListPos].cards[fromCardPos];

    if (!targetCard) {
      throw new Error(`No Card exists at ${fromListPos}:${fromCardPos}`);
    }

    this.state.columns[toListPos].cards[toCardPos] = targetCard;
  }
}

export default new Model(5, 10);
