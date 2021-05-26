import { IList } from "../models/IList";
import { ICard } from "../models/ICard";
import { Stack } from "../typings";
import { TemplateInjector } from "../template/template-injector";
import { addList } from "../template/template-names";

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
      "root",
      addList,
      "beforeend"
    );

    this.init();
  }

  private init(): void {
    // 1. attach list under the #root
  }
}
