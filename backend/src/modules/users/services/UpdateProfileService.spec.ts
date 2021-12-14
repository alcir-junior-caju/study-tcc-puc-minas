import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    const updatedUser = await updateProfileService.execute({
      userId: user.id,
      name: 'John Tre',
      email: 'johntre@example.com'
    });

    expect(updatedUser.name).toBe('John Tre');
    expect(updatedUser.email).toBe('johntre@example.com');
  });

  it('should not be able update the profile from non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        userId: 'non-existing-user-id',
        name: 'John Doe',
        email: 'johndoe@example.com'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joedoe@example.com',
      password: '123456'
    });

    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: 'Joe Doe',
        email: 'johndoe@example.com'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    const updatedUser = await updateProfileService.execute({
      userId: user.id,
      name: 'John Tre',
      email: 'johntre@example.com',
      oldPassword: '123456',
      password: '654321'
    });

    expect(updatedUser.password).toBe('654321');
  });

  it('should not be able update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: 'John Tre',
        email: 'johntre@example.com',
        password: '654321'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the password without old password wrong', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: 'John Tre',
        email: 'johntre@example.com',
        oldPassword: 'wrong',
        password: '654321'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
