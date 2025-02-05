import Base from "./Base";
import BaseStyled from "./BaseStyled";
import BodyBase from "./Body";
import BodyStyled from "./BodyStyled";

export const UnstyledConversationSettingsPage = Object.assign(Base, {
    Body: BodyBase,
});

export default Object.assign(BaseStyled, {
    Body: BodyBase,
});

export const ConversationSettingsPageBody = BodyStyled;
export const UnstyledConversationSettingsPageBody = BodyBase;

// Export the types as well.
export * from "./Types";