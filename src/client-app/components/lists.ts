import { IList } from "../models/IList.js";
import { ICard } from "../models/ICard.js";
import { Stack } from "../typings.js";
import { TemplateInjector } from "../template/template-injector.js";
import * as Templates from "../template/template-names.js";

export class Lists {
  private rootEl: HTMLElement;
  private initialAddListTemplateInjector: TemplateInjector<HTMLDivElement>;

  private listsStack: Stack<IList> = new Stack();
  private cardsStack: Stack<ICard> = new Stack();

  constructor() {
    // 1. setup the main anchor
    this.rootEl = document.getElementById("root")! as HTMLElement;

    if (!this.rootEl) {
      throw new Error("Invalid Lists anchor element!");
    }

    // 2. init template injector
    this.initialAddListTemplateInjector = new TemplateInjector<HTMLDivElement>(
      ".card-list",
      Templates.addList,
      "afterbegin"
    );

    this.init();
  }

  private init(): void {
    // 1. attach list under the #root
  }
}
