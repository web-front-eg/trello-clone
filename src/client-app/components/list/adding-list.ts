import { TemplateInjector } from "../../template/template-injector.js";
import { IList } from "../../models/IList.js";
import { autobind } from "../../decorators/autobind.js";
import { Lists } from "../lists.js";

export class AddingList<Ty extends HTMLElement> implements IList {
  public content: string = "";

  private listTitleInputEl: HTMLInputElement;
  private listSaveBtnEl: HTMLButtonElement;

  constructor(private templateInjector: TemplateInjector<Ty>) {
    if (!this.templateInjector) {
      throw new Error("No template injector valid!");
    }

    this.listTitleInputEl = this.templateInjector.getCreatedEl
      .firstElementChild! as HTMLInputElement;

    this.listSaveBtnEl = this.templateInjector.getCreatedEl.querySelector(
      ".btn"
    )! as HTMLButtonElement;

    this.init();
  }

  private init(): void {
    this.listSaveBtnEl.addEventListener("click", this.onClickSaveBtn);
  }

  @autobind
  private onClickSaveBtn(_: Event): void {
    console.log("btn clicked!");
    console.log(this.listTitleInputEl);

    // TODO: set input as a title of added list
    Lists.onListAdded();
  }

  public removeMyself(): void {
    this.templateInjector.removeMyself();
  }
}
