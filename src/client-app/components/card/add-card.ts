import { BaseEntity } from "../base-entity.js";
import { TemplateInjector } from "../../template/template-injector.js";
import { ICard } from "../../models/ICard.js";
import { AddingCard } from "./adding-card.js";
import { autobind } from "../../decorators/autobind.js";
import * as Templates from "../../template/template-names.js";

export class AddCard
  extends BaseEntity<HTMLDivElement, AddingCard>
  implements ICard
{
  public content: string;
  private fixedCurrentListPosition: number;

  constructor(templateInjector: TemplateInjector<HTMLDivElement>) {
    super(templateInjector, "AddCard");
    this.fixedCurrentListPosition = BaseEntity.currentListPosition - 1;
    this.init();
  }

  protected init(): void {
    this.currentEl.addEventListener("click", this.onClickAddCard);
  }

  @autobind
  private onClickAddCard(_: Event): void {
    this.nextEntity = new AddingCard(
      new TemplateInjector<HTMLDivElement>(
        this.templateInjector.getCurElIdOrClassName,
        Templates.addingCard,
        "afterend",
        this.fixedCurrentListPosition
      ),
      this.fixedCurrentListPosition
    );
    // this.currentEl.remove();
    this.currentEl.style.display = "none";
  }
}
