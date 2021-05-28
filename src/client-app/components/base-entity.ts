import { TemplateInjector } from "template/template-injector.js";
import { ICard } from "../models/ICard.js";
import { IList } from "../models/IList.js";

export abstract class BaseEntity<
  TyHTMLEl extends HTMLElement,
  TyNextEntity extends IList | ICard = any
> {
  protected currentEl: TyHTMLEl;
  protected nextEntity: TyNextEntity;

  constructor(
    protected templateInjector: TemplateInjector<TyHTMLEl>,
    currentEntityName: string
  ) {
    if (!this.templateInjector) {
      throw new Error(`No template injector valid!: ${currentEntityName}`);
    }

    this.currentEl = this.templateInjector.getCreatedEl! as TyHTMLEl;
  }

  protected abstract init(): void;

  protected removeMyself(): void {
    this.templateInjector.removeMyself();
  }
}
