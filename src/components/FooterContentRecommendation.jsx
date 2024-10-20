import Link from "next/link";

const FooterContentRecommendation = ({ contentRecommendation }) => {
  return (
    <footer className='container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t-[1px] border-gray-200 grid grid-flow-row grid-cols-2 gap-2'>
      {contentRecommendation && contentRecommendation?.pre && (
        <Link
          href={`/${contentRecommendation.pre.params.type}/${contentRecommendation.pre.params.item}`}
          className='rounded-md border-[1px] p-4 w-full cursor-pointer shadow hover:shadow-none'
          data-testid={"pre-link-recommendation"}
        >
          <div className='flex flex-row gap-2'>
            <h3 className="font-bold text-gray-900">← </h3>
            <div className='flex flex-col w-full break-words max-w-24 md:max-w-full'>
              <h3 className="font-bold text-gray-900">{contentRecommendation.pre.params.title}</h3>
              <p className='text-sm text-gray-400'>{contentRecommendation.pre.params.description}</p>
            </div>
          </div>
        </Link>
      )}
      {contentRecommendation && contentRecommendation?.next && (
        <Link href={`/${contentRecommendation.next.params.type}/${contentRecommendation.next.params.item}`}
          className='rounded-md border-[1px] p-4 w-full cursor-pointer shadow hover:shadow-none'
          data-testid={"next-link-recommendation"}
        >
          <div className='flex flex-row gap-2'>
            <div className='flex flex-col w-full break-words max-w-24 md:max-w-full'>
              <h3 className="font-bold text-gray-900">{contentRecommendation.next.params.title}</h3>
              <p className='text-sm text-gray-400'>{contentRecommendation.next.params.description}</p>
            </div>
            <h3 className="font-bold text-gray-900">→</h3>
          </div>
        </Link>
      )}
    </footer>
  );
};

export default FooterContentRecommendation;
