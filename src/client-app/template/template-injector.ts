export class TemplateInjector<TCreateEl extends HTMLElement> {
  private templateEl: HTMLTemplateElement;
  private rootEl: HTMLDivElement;
  private createdEl: TCreateEl;

  constructor(
    rootId: string,
    templateId: string,
    insertWhere: InsertPosition,
    newTemplateClassName?: string
  ) {
    // 1. set up the anchor tag and the template tag
    this.templateEl = document.getElementById(
      templateId
    )! as HTMLTemplateElement;

    if (!this.templateEl) {
      throw new Error(`template ID ${templateId} is invalid!`);
    }

    this.rootEl = document.getElementById(rootId)! as HTMLDivElement;

    if (!this.rootEl) {
      throw new Error(`anchor ID ${rootId} is invalid!`);
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

    // 4. forward the position to insert the createdEl
    this.insertAt(insertWhere);
  }

  private insertAt(where: InsertPosition): void {
    this.rootEl.insertAdjacentElement(where, this.createdEl);
  }
}
