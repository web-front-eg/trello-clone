import { TemplateHelper } from "template/TemplateHelper.js";
import { ICard } from "../model/ICard.js";
import { IList } from "../model/IList.js";

export abstract class View<
  TyHTMLEl extends HTMLElement,
  TyNextView extends IList | ICard = any
> {
  protected static currentListPosition: number = 0;
  protected currentEl: TyHTMLEl;
  protected nextView: TyNextView;

  protected templateHelper: TemplateHelper<TyHTMLEl>;
  public get getTemplateHelper(): TemplateHelper<TyHTMLEl> {
    return this.templateHelper;
  }

  constructor(
    templateHelper: TemplateHelper<TyHTMLEl>,
    currentViewName: string
  ) {
    this.templateHelper = templateHelper;

    if (!this.templateHelper) {
      throw new Error(`No template injector valid!: ${currentViewName}`);
    }

    this.currentEl = this.templateHelper.getCreatedEl! as TyHTMLEl;
  }

  protected abstract init(): void;
  protected abstract reset(): void;

  protected removeMyself(): void {
    this.templateHelper.removeMyself();
  }
}
