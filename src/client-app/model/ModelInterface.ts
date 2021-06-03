export interface ICard {
  content: string;
}

export interface IList {
  title: string;
  cards: Array<ICard>;
}

export interface IState {
  lists: Array<IList>;
}
