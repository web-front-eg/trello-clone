import { IList } from "models/IList";
import { ICard } from "models/ICard";

export class Lists {
  private listsAnchorEl: HTMLElement;

  private listArr: Array<IList> = new Array();
  private cardArr: Array<ICard> = new Array();

  constructor() {
    // 1. setup the main anchor
    this.listsAnchorEl = document.getElementById("card-lists")! as HTMLElement;

    if (!this.listsAnchorEl) {
      throw new Error("Invalid Lists anchor element!");
    }

    
  }
}
