import crypto from "crypto";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Survey } from "./Survey";

@Entity("surveys_users")
class SurveyUser {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  survey_id: string;
  @ManyToOne(() => Survey)
  @JoinColumn({ name: "survey_id" })
  survey:  Survey;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = crypto.randomUUID();
    }
  }
}

export { SurveyUser };
