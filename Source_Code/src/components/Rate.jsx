import Rating from "@material-ui/lab/Rating";

function Rate({ rating, numOfVotes }) {
  return (
    <div className="w-full flex justify-center">
      <Rating name="read-only" value={rating} readOnly />
      <p className="text-sm ">{`(${numOfVotes} صوتاً )`}</p>
    </div>
  );
}

export default Rate;
