import { BaseEntity } from "../base-entity.js";
import { TemplateInjector } from "../../template/template-injector.js";
import { IDragTarget } from "../../models/IDragTarget";
import { IList } from "../../models/IList";
import { AddCard } from "../card/add-card.js";
import * as Templates from "../../template/template-names.js";

export class AddedList
  extends BaseEntity<HTMLDivElement, AddCard>
  implements IDragTarget, IList
{
  public content: string = "";

  constructor(
    templateInjector: TemplateInjector<HTMLParagraphElement>,
    content: string
  ) {
    super(templateInjector, "AddedList");
    this.content = content;
    this.init();
  }

  protected init(): void {
    // attach add card initially
    this.nextEntity = new AddCard(
      new TemplateInjector<HTMLParagraphElement>(
        this.templateInjector.getCurElIdOrClassName,
        Templates.addCard,
        "afterend",
        BaseEntity.currentListPosition - 1
      )
    );
  }

  public dragOverHandler(e: DragEvent): void {}

  public dropHandler(e: DragEvent): void {}

  public dragLeaveHandler(e: DragEvent): void {}
}
