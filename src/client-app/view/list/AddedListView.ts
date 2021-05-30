import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { IDragTarget } from "../../model/IDragTarget";
import { AddCardView } from "../card/AddCardView.js";
import * as Templates from "../../template/TemplateNames.js";
import { ListController } from "../../controller/ListController.js";
import { autobind } from "../../decorator/autobind.js";
// import { CardController } from "controller/CardController.js";

export class AddedListView extends View<HTMLDivElement> implements IDragTarget {
  private readonly titleEl: HTMLElement;

  constructor(
    templateHelper: TemplateHelper<HTMLParagraphElement>,
    content: string
  ) {
    super(templateHelper, "AddedListView");

    this.titleEl = this.currentEl.querySelector("strong")! as HTMLElement;

    this.titleEl.innerText = content;
    ListController.onSetTitleInAddedList(content);

    this.init();
  }

  protected reset(): void {
    //
  }

  protected init(): void {
    //
    this.currentEl.addEventListener("dragover", this.onDragOver);
    this.currentEl.addEventListener("drop", this.onDrop);
    this.currentEl.addEventListener("dragleave", this.onDragLeave);

    // attach add card initially
    if (!this.nextView) {
      this.nextView = new AddCardView(
        new TemplateHelper<HTMLParagraphElement>(
          this.templateHelper.getCurElIdOrClassName,
          Templates.addCard,
          "afterend",
          false,
          View.currentListPosition
        )
      );
    }
  }

  @autobind
  public onDragOver(e: DragEvent): void {
    if (!e.dataTransfer || e.dataTransfer.types[0] !== "text/plain") {
      return;
    }

    e.preventDefault();
    // console.log(`drag over!!`);
    // TODO: change css to indicate card is being dragged and it's over the list
  }

  @autobind
  public onDrop(e: DragEvent): void {
    const card = e.dataTransfer!.getData("text/plain");
    console.log("drop!", card);

    // move the card!
    // CardController.
  }

  @autobind
  public onDragLeave(e: DragEvent): void {
    console.log("drag leave!");

    // TODO: stop highlighting the list!
  }
}
