import React from "react";
import { Image } from "cloudinary-react";
const CardMessage = ({ message, author, image }) => {
  return (
    <div className={author}>
      {image && (
        <Image
          style={{ width: 200, borderRadius: 12 }}
          cloudName="dvewnctgf"
          publicId={image}
        />
      )}
      <p className="message-content ">{message}</p>
    </div>
  );
};
//

export default CardMessage;
