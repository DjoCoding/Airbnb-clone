interface FAQProps {
    question: string;
    answer: string;
    children: React.ReactNode;
}

export default function FAQItem({ question, answer, children }: FAQProps) {
    return(
        <div className="flex flex-col gap-3 w-[300px]">
            { children }
            <h2 className="font-[600] text-2xl text-gray-600">{ question }</h2>
            <p className="text-lg text-gray-600">{ answer }</p>
        </div>
    )
}