import { TyHTMLCode, TyEventListnerType, TyEventListner } from "typings";
import { v4 as uuid } from "uuid";

class TemplateMaker {
  public static makeAddList(): TyHTMLCode {
    return `
        <div class="card-list__add-list">Add a list...</div>
        `;
  }

  /**
   *
   * @param onClickSaveBtn
   * @returns [0]: HTML 템플릿 코드
   *          [1]: save button click 을 등록하는 함수
   *
   */
  public static makeAddingList(
    onClickSaveBtn: (e: Event) => void
  ): [TyHTMLCode, Function] {
    const relOnClickSaveBtn = `adding-list-save-btn-${uuid()}`;
    return [
      `
      <div class="card-list__adding-list">
          <input type="text" placeholder="Add a list..." />
          <div class="card-list__adding-list__under">
            <button class="btn" rel=${relOnClickSaveBtn}>Save</button> <i class="fas fa-times"></i>
          </div>
        </div>
      `,
      () => {
        const saveBtnEl = document.querySelector(
          `[rel=${relOnClickSaveBtn}]`
        ) as HTMLButtonElement;

        if (!saveBtnEl) {
          throw new Error("querySelector failed!: card-list__adding-list");
        }

        saveBtnEl.addEventListener("click", (e: Event): any =>
          onClickSaveBtn(e)
        );
      },
    ];
  }

  public static makeAddedList(title: string): [TyHTMLCode, Function] {
    return [
      `
        <div class="card-list__title">
          <strong>${title}</strong>
          <i class="fas fa-ellipsis-h"></i>
        </div>
      `,
      () => {},
    ];
  }

  public static makeAddCard(
    onClickAddCard: (e: Event) => any
  ): [TyHTMLCode, Function] {
    const relOnClickAddCard = `add-card-btn-${uuid()}`;
    return [
      `<p class="card-list__add-card" rel=${relOnClickAddCard}>Add a card...</p>`,
      () => {
        const addCardBtnEl = document.querySelector(
          `[rel=${relOnClickAddCard}]`
        ) as HTMLParagraphElement;

        if (!addCardBtnEl) {
          throw new Error("querySelector failed: card-list__add-card");
        }

        addCardBtnEl.addEventListener("click", (e: Event): any =>
          onClickAddCard(e)
        );
      },
    ];
  }

  public static makeAddingCard(
    onClickAddingCard: (e: Event, content: string) => any
  ): [TyHTMLCode, Function] {
    const relAddingCardTextArea = `adding-card-text-area`;
    const relOnClickAddingCard = `adding-card-btn-${uuid()}`;
    return [
      ` <div class="card-list__adding-card">
          <textarea name="" id="" cols="30" rows="4" rel=${relAddingCardTextArea}></textarea>

          <div class="card-list__adding-card__under">
            <div class="card-list__adding-card__under__left">
              <button class="btn" rel=${relOnClickAddingCard}>Add</button> <i class="fas fa-times"></i>
            </div>
            <div class="card-list__adding-card__under__right">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
        </div>`,
      () => {
        const addingCardTextAreaEl = document.querySelector(
          `[rel=${relAddingCardTextArea}]`
        ) as HTMLTextAreaElement;

        if (!addingCardTextAreaEl) {
          throw new Error(
            "querySelector failed: card--list__adding-card textarea"
          );
        }

        const addingCardBtnEl = document.querySelector(
          `[rel=${relOnClickAddingCard}]`
        ) as HTMLButtonElement;

        if (!addingCardBtnEl) {
          throw new Error(
            "querySelector failed: card--list__adding-card button"
          );
        }

        addingCardBtnEl.addEventListener("click", (e: MouseEvent): any =>
          onClickAddingCard(e, addingCardTextAreaEl.value)
        );
      },
    ];
  }

  public static makeAddedCard(
    onStartDrag: Function,
    title: string
  ): [TyHTMLCode, Function] {
    return [
      `
      <div class="card-list__added-card">
          <div class="card-list__added-inside">
            <p class="card-list__added-card__title">${title}</p>
            <i class="fas fa-pencil-alt"></i>
          </div>
        </div>`,
      () => {},
    ];
  }
}
