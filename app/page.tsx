import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import {recentSessions} from "@/constants";
import {getAllCompanions, getRecentSessions, isBookMarked} from "@/lib/actions/companion.actions";
import {getSubjectColor} from "@/lib/utils";
import {auth} from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

const Page = async () => {
    const companions = await getAllCompanions({ limit: 3 });
    const recentSessionsCompanions = await getRecentSessions(10);
    const { userId } = await auth();

    const user = '*';

    return (
        <main>
            <h1>Popular Companions</h1>

            <section className="home-section">
                {companions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                        bookmarked={isBookMarked(companion.id, user)}
                    />
                ))}

            </section>

            <section className="home-section">
                <CompanionsList
                    title="Recently completed sessions"
                    companions={recentSessionsCompanions}
                    classNames="w-2/3 max-lg:w-full"
                />
                <CTA />
            </section>
        </main>
    )
}

export default Page