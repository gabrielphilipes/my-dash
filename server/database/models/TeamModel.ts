import { useDB } from '~~/server/utils/useDB'
import * as schema from '../schema'
import { eq } from 'drizzle-orm'
import type { CreateTeam, SelectTeam, CreateTeamMember, SelectTeamMember } from '../schema'

class TeamModel {
  async findAll(userId: string): Promise<SelectTeam[]> {
    try {
      let teams = await useDB()
        .select()
        .from(schema.teams)
        .leftJoin(schema.teamMembers, eq(schema.teamMembers.teamId, schema.teams.id))
        .where(eq(schema.teamMembers.userId, userId))
        .all()

      if (teams.length === 0) {
        return []
      }

      return teams.map((team) => team.teams)
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async create(data: CreateTeam): Promise<SelectTeam | null> {
    try {
      return await useDB().insert(schema.teams).values(data).returning().get()
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async update(id: string, data: Partial<CreateTeam>): Promise<SelectTeam | null> {
    try {
      return await useDB()
        .update(schema.teams)
        .set(data)
        .where(eq(schema.teams.id, id))
        .returning()
        .get()
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async findById(id: string): Promise<SelectTeam | null> {
    try {
      const team = await useDB()
        .select()
        .from(schema.teams)
        .where(eq(schema.teams.id, id))
        .limit(1)
        .get()

      return team ?? null
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async addMember(teamId: string, userId: string): Promise<SelectTeamMember | null> {
    try {
      return await useDB()
        .insert(schema.teamMembers)
        .values({
          teamId,
          userId
        })
        .returning()
        .get()
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async removeMember(teamId: string, userId: string): Promise<boolean> {
    try {
      await useDB()
        .delete(schema.teamMembers)
        .where(eq(schema.teamMembers.teamId, teamId) && eq(schema.teamMembers.userId, userId))

      return true
    } catch (error) {
      console.error(error)

      return false
    }
  }

  async getTeamMembers(teamId: string): Promise<SelectTeamMember[]> {
    try {
      return await useDB()
        .select()
        .from(schema.teamMembers)
        .where(eq(schema.teamMembers.teamId, teamId))
        .all()
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await useDB().delete(schema.teams).where(eq(schema.teams.id, id))

      return true
    } catch (error) {
      console.error(error)

      return false
    }
  }
}

export const teamModel = new TeamModel()
