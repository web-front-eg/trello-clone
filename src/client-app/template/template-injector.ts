export class TemplateInjector<TCreateEl extends HTMLElement> {  
  private templateEl: HTMLTemplateElement;

  /**
   * rool element of this created element
   */
  private rootEl: HTMLDivElement;

  private createdEl: TCreateEl;
  /**
   * if not exists, it's falsy null
   */
  public get getCreatedEl(): TCreateEl {
    return this.createdEl;
  }

  private curElId: string;
  /**
   * if not exists, it's falsy ""
   */
  public get getCurElId(): string {
    return this.curElId;
  }

  private curElClass: string;
  /**
   * if not exists, it's falsy ""
   */
  public get getCurElClass(): string {
    return this.curElClass;
  }

  constructor(
    root: string,
    template: string,
    insertWhere: InsertPosition,
    newTemplateClassName?: string
  ) {
    // 1. set up the anchor tag and the template tag
    this.templateEl = document.getElementById(template)! as HTMLTemplateElement;

    if (!this.templateEl) {
      throw new Error(`template ID or Class ${template} is invalid!`);
    }

    this.rootEl = document.querySelector(root)! as HTMLDivElement;

    if (!this.rootEl) {
      throw new Error(`anchor ID or Class ${root} is invalid!`);
    }

    // 2. import a node from the template
    const imported = document.importNode(this.templateEl.content, true);

    // 3. get the first element child of the imported node
    this.createdEl = <TCreateEl>imported.firstElementChild;

    if (!this.createdEl) {
      throw new Error(`Element creation failed!`);
    }

    if (newTemplateClassName) {
      this.createdEl.classList.add(newTemplateClassName);
    }

    // 4. save id or class name of the created element.
    this.curElId = this.createdEl.id ?? "";
    this.curElClass = this.createdEl.className ?? "";

    // 5. forward the position to insert the createdEl
    this.insertAt(insertWhere);
  }

  private insertAt(where: InsertPosition): void {
    this.rootEl.insertAdjacentElement(where, this.createdEl);
  }

  public removeMyself(): void {
    this.createdEl.remove();
  }
}
