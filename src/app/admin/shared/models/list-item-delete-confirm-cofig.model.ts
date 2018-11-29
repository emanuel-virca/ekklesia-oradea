export class ListItemConfirmConfigModel<T> {
  title: string;
  message: string | ((item: T) => string);
}
