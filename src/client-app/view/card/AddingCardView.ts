import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { AddedCardView } from "./AddedCardView.js";
import { autobind } from "../../decorator/autobind.js";
import * as Templates from "../../template/TemplateNames.js";
import { ViewCache } from "../../controller/ViewCache.js";
import { CardController } from "../../controller/CardController.js";
import { delay } from "../../util/timer.js";

export class AddingCardView extends View<HTMLDivElement> {
  private readonly titleTextareaEl: HTMLTextAreaElement;
  private readonly addBtnEl: HTMLButtonElement;
  public readonly parentListPos: number;

  constructor(
    templateHelper: TemplateHelper<HTMLDivElement>,
    parentListPos: number
  ) {
    super(templateHelper, "AddingCardView");

    this.parentListPos = parentListPos;

    this.titleTextareaEl = this.currentEl
      .firstElementChild! as HTMLTextAreaElement;

    delay(() => this.titleTextareaEl.focus(), 1);

    this.addBtnEl = this.currentEl.querySelector(".btn")! as HTMLButtonElement;

    this.init();
  }

  protected init(): void {
    ViewCache.setAddingCardView = this;

    this.addBtnEl.addEventListener("click", this.onClickAddCard);
    this.titleTextareaEl.addEventListener("keypress", this.onPressEnterKey);
    this.titleTextareaEl.addEventListener("focusout", this.onFocusOut);

    this.reset();
  }

  protected reset(): void {
    this.titleTextareaEl.value = "";
  }

  @autobind
  private onClickAddCard(_: Event): void {
    this.addChild();
  }

  @autobind
  private onPressEnterKey(e: Event): void {
    if ((e as KeyboardEvent).key !== "Enter") return;

    this.addChild();
  }

  @autobind
  private onFocusOut(_: Event): void {
    this.currentEl.style.display = "none";
    CardController.onCloseAddingCard(this.parentListPos);
  }

  /**
   * set the content of adding-card, which is the title of added-card
   * with the value of input.
   */
  private addChild(): void {
    if (!this.titleTextareaEl.value) {
      return;
    }

    this.nextView = new AddedCardView(
      new TemplateHelper<HTMLDivElement>(
        this.templateHelper.getCurElIdOrClassName,
        Templates.addedCard,
        "beforebegin",
        true
      ),
      this.titleTextareaEl.value,
      this.parentListPos
    );

    this.nextView.templateHelper.insertAtManually(
      "beforebegin",
      this.currentEl
    );

    CardController.onAddingCardAdded(this.parentListPos);
    this.reset();
  }

  public onClickAddCardAgain(): void {
    // show and focus adding-card on clicking add-card again
    this.currentEl.style.display = "block";
    delay(() => {
      this.titleTextareaEl.focus();
      this.reset();
    }, 1);
  }

  public closeAddingCardForced(): void {
    this.currentEl.style.display = "none";
    this.titleTextareaEl.blur();
  }
}


// @Autobind
//   dragOverHandler(event: DragEvent): void {
//     if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
//       event.preventDefault(); // drop is only triggered without this.
//       const listEl = <HTMLUListElement>this.element.querySelector("ul")!;
//       listEl.classList.add("droppable");
//     }
//   }

//   @Autobind
//   dropHandler(event: DragEvent): void {
//     const prjId: string = event.dataTransfer!.getData("text/plain");
//     ProjectState.instance.moveProject(prjId, this.type);
//   }

//   @Autobind
//   dragLeaveHandler(_: DragEvent): void {
//     const listEl = <HTMLUListElement>this.element.querySelector("ul")!;
//     if (listEl.classList.contains("droppable")) {
//       listEl.classList.remove("droppable");
//     }
//   }
