export class TemplateInjector<TCreateEl extends HTMLElement> {
  private uuid: string;

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

  private curElIdOrClassName: string;
  /**
   * if not exists, it's falsy ""
   */
  public get getCurElIdOrClassName(): string {
    return this.curElIdOrClassName;
  }

  constructor(
    rootIdorClassName: string,
    templateIdOrClassName: string,
    insertWhere: InsertPosition,
    newTemplateClassName?: string
  ) {
    // 1. set up the anchor tag and the template tag
    this.templateEl = document.getElementById(
      templateIdOrClassName
    )! as HTMLTemplateElement;

    if (!this.templateEl) {
      throw new Error(
        `template ID or Class ${templateIdOrClassName} is invalid!`
      );
    }

    this.rootEl = document.querySelector(rootIdorClassName)! as HTMLDivElement;

    if (!this.rootEl) {
      throw new Error(`anchor ID or Class ${rootIdorClassName} is invalid!`);
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
    this.curElIdOrClassName = this.createdEl.id ? `#${this.createdEl.id}` : "";
    this.curElIdOrClassName = this.createdEl.className
      ? `.${this.createdEl.className}`
      : "";

    // 5. set up a key to identify as a data attribute
    this.uuid = (Math.random() * 1234124).toString().slice(0, 5).trim();
    this.createdEl.dataset["key"] = this.uuid;

    // 6. forward the position to insert the createdEl
    this.insertAt(insertWhere);
  }

  private insertAt(where: InsertPosition): void {
    this.rootEl.insertAdjacentElement(where, this.createdEl);
  }

  public removeMyself(): void {
    this.createdEl.remove();
  }
}
